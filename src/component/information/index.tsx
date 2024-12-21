import { BRIDE_INFO, GROOM_INFO } from "../../const"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../store"

export const Information = () => {
  const { openModal, closeModal } = useModal()
  return (
    <LazyDiv className="card information">
      <h2 className="english">Information</h2>
      <div className="info-card">
        <div className="label">Meal Information</div>
        <div className="content">
          Meal Time: 12:30 PM ~ 2:30 PM
          <br />
          Location: Banquet Hall, Basement Level 1
        </div>
      </div>

      <div className="info-card">
        <div className="label">Sending Your Regards</div>
        <div className="content">
          For those unable to attend and offer congratulations in person,
          <br />
          we have included account numbers.
          <br />
          We kindly ask for your understanding.
        </div>

        <div className="break" />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">Groom's Account Information</div>,
              content: (
                <>
                  {GROOM_INFO.filter(({ account }) => !!account).map(
                    ({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            if (account) {
                              try {
                                navigator.clipboard.writeText(account)
                                alert(account + "\nCopied to clipboard.")
                              } catch {
                                alert("Failed to copy.")
                              }
                            }
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    ),
                  )}
                </>
              ),
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
          }}
        >
          View Groom's Account Information
        </Button>
        <div className="break" />
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">Bride's Account Information</div>,
              content: (
                <>
                  {BRIDE_INFO.filter(({ account }) => !!account).map(
                    ({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            if (account) {
                              try {
                                navigator.clipboard.writeText(account)
                                alert(account + "\nCopied to clipboard.")
                              } catch {
                                alert("Failed to copy.")
                              }
                            }
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    ),
                  )}
                </>
              ),
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
          }}
        >
          View Bride's Account Information
        </Button>
      </div>
    </LazyDiv>
  )
}
