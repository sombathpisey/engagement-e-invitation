import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "../button"
import { dayjs } from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../store"
import offlineGuestBook from "./offlineGuestBook.json"

const RULES = {
  name: {
    maxLength: 10,
  },
  content: {
    maxLength: 100,
  },
  password: {
    minLength: 4,
    maxLength: 20,
  },
}

const PAGES_PER_BLOCK = 5
const POSTS_PER_PAGE = 5

type Post = {
  id: number
  timestamp: number
  name: string
  content: string
}

export const GuestBook = () => {
  const { openModal, closeModal } = useModal()

  const [posts, setPosts] = useState<Post[]>([])

  const loadPosts = async () => {
    if (process.env.REACT_APP_SERVER_URL) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/guestbook?offset=${0}&limit=${3}`,
        )
        if (res.ok) {
          const data = await res.json()

          setPosts(data.posts)
        }
      } catch {}
    } else {
      setPosts(offlineGuestBook.slice(0, 3))
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <LazyDiv className="card guestbook">
      <h2 className="english">Guest Book</h2>

      <div className="break" />

      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="heading">
            <button
              className="close-button"
              onClick={async () => {
                if (process.env.REACT_APP_SERVER_URL) {
                  openModal({
                    className: "delete-guestbook-modal",
                    closeOnClickBackground: false,
                    header: (
                      <div className="title">
                        Are you sure you want to delete?
                      </div>
                    ),
                    content: (
                      <DeleteGuestBookModal
                        postId={post.id}
                        onSuccess={() => {
                          loadPosts()
                        }}
                      />
                    ),
                    footer: (
                      <>
                        <Button
                          buttonStyle="style2"
                          type="submit"
                          form="guestbook-delete-form"
                        >
                          Delete
                        </Button>
                        <Button
                          buttonStyle="style2"
                          className="bg-light-grey-color text-dark-color"
                          onClick={closeModal}
                        >
                          Close
                        </Button>
                      </>
                    ),
                  })
                }
              }}
            />
          </div>
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {dayjs.unix(post.timestamp).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      {process.env.REACT_APP_SERVER_URL && (
        <>
          <Button
            onClick={() =>
              openModal({
                className: "write-guestbook-modal",
                closeOnClickBackground: false,
                header: (
                  <div className="title-group">
                    <div className="title">Write a Guestbook Message</div>
                    <div className="subtitle">
                      Share your congratulations with the couple.
                    </div>
                  </div>
                ),
                content: <WriteGuestBookModal loadPosts={loadPosts} />,
                footer: (
                  <>
                    <Button
                      buttonStyle="style2"
                      type="submit"
                      form="guestbook-write-form"
                    >
                      Save
                    </Button>
                    <Button
                      buttonStyle="style2"
                      className="bg-light-grey-color text-dark-color"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                  </>
                ),
              })
            }
          >
            Write a Message
          </Button>
          <div className="break" />
        </>
      )}

      <Button
        onClick={() =>
          openModal({
            className: "all-guestbook-modal",
            closeOnClickBackground: true,
            header: <div className="title">View All Messages</div>,
            content: <AllGuestBookModal loadPosts={loadPosts} />,
            footer: (
              <Button
                buttonStyle="style2"
                className="bg-light-grey-color text-dark-color"
                onClick={closeModal}
              >
                Close
              </Button>
            ),
          })
        }
      >
        View All Messages
      </Button>
    </LazyDiv>
  )
}

const WriteGuestBookModal = ({ loadPosts }: { loadPosts: () => void }) => {
  const inputRef = useRef({}) as React.MutableRefObject<{
    name: HTMLInputElement
    content: HTMLTextAreaElement
    password: HTMLInputElement
  }>
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="guestbook-write-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const name = inputRef.current.name.value.trim()
          const content = inputRef.current.content.value.trim()
          const password = inputRef.current.password.value

          if (!name) {
            alert("Please enter your name.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(
              `Please enter a name with fewer than ${RULES.name.maxLength} characters.`,
            )
            return
          }

          if (!content) {
            alert("Please enter a message.")
            return
          }
          if (content.length > RULES.content.maxLength) {
            alert(
              `Please enter a message with fewer than ${RULES.content.maxLength} characters.`,
            )
            return
          }

          if (password.length < RULES.password.minLength) {
            alert(
              `Password must be at least ${RULES.password.minLength} characters.`,
            )
            return
          }
          if (password.length > RULES.password.maxLength) {
            alert(
              `Password must be no more than ${RULES.password.maxLength} characters.`,
            )
            return
          }

          const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/guestbook`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, content, password }),
            },
          )
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("Your message has been added to the guestbook.")
          closeModal()
          loadPosts()
        } catch {
          alert("Failed to add your message to the guestbook.")
        } finally {
          setLoading(false)
        }
      }}
    >
      Name
      <input
        disabled={loading}
        type="text"
        placeholder="Enter your name."
        className="name"
        ref={(ref) => (inputRef.current.name = ref as HTMLInputElement)}
        maxLength={RULES.name.maxLength}
      />
      Message
      <textarea
        disabled={loading}
        placeholder="Enter a message of up to 100 characters."
        className="content"
        ref={(ref) => (inputRef.current.content = ref as HTMLTextAreaElement)}
        maxLength={RULES.content.maxLength}
      />
      Password
      <input
        disabled={loading}
        type="password"
        placeholder="Enter a password."
        className="password"
        ref={(ref) => (inputRef.current.password = ref as HTMLInputElement)}
        maxLength={RULES.password.maxLength}
      />
    </form>
  )
}

const AllGuestBookModal = ({
  loadPosts,
}: {
  loadPosts: () => Promise<void>
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const { openModal, closeModal } = useModal()

  const loadPage = async (page: number) => {
    setCurrentPage(page)
    if (process.env.REACT_APP_SERVER_URL) {
      try {
        const offset = page * POSTS_PER_PAGE
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/guestbook?offset=${offset}&limit=${POSTS_PER_PAGE}`,
        )
        if (res.ok) {
          const data = await res.json()

          setPosts(data.posts)
          setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE))
          if (data.total < offset) {
            setCurrentPage(Math.ceil(data.total / POSTS_PER_PAGE) - 1)
          }
        }
      } catch {}
    } else {
      setCurrentPage(page)

      setPosts(
        offlineGuestBook.slice(
          page * POSTS_PER_PAGE,
          (page + 1) * POSTS_PER_PAGE,
        ),
      )
      setTotalPages(Math.ceil(offlineGuestBook.length / POSTS_PER_PAGE))
    }
  }

  useEffect(() => {
    loadPage(0)
  }, [])

  const pages = useMemo(() => {
    const start = Math.floor(currentPage / PAGES_PER_BLOCK) * PAGES_PER_BLOCK
    const end = Math.min(start + PAGES_PER_BLOCK, totalPages)

    return Array.from({ length: end - start }).map((_, index) => index + start)
  }, [currentPage, totalPages])

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="heading">
            <div
              className="close-button"
              onClick={async () => {
                if (process.env.REACT_APP_SERVER_URL) {
                  openModal({
                    className: "delete-guestbook-modal",
                    closeOnClickBackground: false,
                    header: (
                      <div className="title">
                        Are you sure you want to delete?
                      </div>
                    ),
                    content: (
                      <DeleteGuestBookModal
                        postId={post.id}
                        onSuccess={() => {
                          loadPosts()
                          loadPage(currentPage)
                        }}
                      />
                    ),
                    footer: (
                      <>
                        <Button
                          buttonStyle="style2"
                          type="submit"
                          form="guestbook-delete-form"
                        >
                          Delete
                        </Button>
                        <Button
                          buttonStyle="style2"
                          className="bg-light-grey-color text-dark-color"
                          onClick={closeModal}
                        >
                          Close
                        </Button>
                      </>
                    ),
                  })
                }
              }}
            />
          </div>
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {dayjs.unix(post.timestamp).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      <div className="pagination">
        {pages[0] > 0 && (
          <div
            className="page"
            onClick={() => {
              loadPage(pages[0] - 1)
            }}
          >
            Previous
          </div>
        )}
        {pages.map((page) => (
          <div
            className={`page${page === currentPage ? " current" : ""}`}
            key={page}
            onClick={() => {
              if (page === currentPage) return
              loadPage(page)
            }}
          >
            {page + 1}
          </div>
        ))}
        {pages[pages.length - 1] < totalPages - 1 && (
          <div
            className="page"
            onClick={() => {
              loadPage(pages[pages.length - 1] + 1)
            }}
          >
            Next
          </div>
        )}
      </div>
    </>
  )
}

const DeleteGuestBookModal = ({
  postId,
  onSuccess,
}: {
  postId: number
  onSuccess: () => void
}) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="guestbook-delete-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const password = inputRef.current.value
          if (!password || password.length < RULES.password.minLength) {
            alert(
              `Password must be at least ${RULES.password.minLength} characters.`,
            )
            return
          }

          if (password.length > RULES.password.maxLength) {
            alert(
              `Password must be no more than ${RULES.password.maxLength} characters.`,
            )
            return
          }

          const result = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/guestbook`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: postId, password }),
            },
          )

          if (!result.ok) {
            if (result.status === 403) {
              alert("Password does not match.")
            } else {
              alert("Failed to delete the message.")
            }
            return
          }

          alert("Message deleted successfully.")
          closeModal()
          onSuccess()
        } catch {
          alert("Failed to delete the message.")
        } finally {
          setLoading(false)
        }
      }}
    >
      Password
      <input
        disabled={loading}
        type="password"
        placeholder="Enter your password."
        className="password"
        ref={inputRef}
        maxLength={RULES.password.maxLength}
      />
    </form>
  )
}
