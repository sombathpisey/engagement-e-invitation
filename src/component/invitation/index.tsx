import { Fragment } from "react/jsx-runtime"
import {
  BRIDE,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { useModal } from "../../component/store"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { ReactComponent as PhoneIcon } from "../../image/phone-flip-icon.svg"
import { ReactComponent as EnvelopeIcon } from "../../image/envelope-icon.svg"

export const Invitation = () => {
  const { openModal, closeModal } = useModal()
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">សិរីសួស្តីពិធីភ្ជាប់ពាក្យ</h2>

      <div className="break" />

      <div className="content">
        មានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកឧកញ៉ា លោកជំទាវ លោក លោកស្រី
      </div>
      <div className="content">
        អ្នកនាងកញ្ញា និងប្រិយមិត្តអញ្ជើញចូលរួមជាអធិបតី និងជា
      </div>
      <div className="content">
        ភ្ញៀវកិត្តិយសដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី ជ័យមង្គល
      </div>
      <div className="content">
        ក្នុងពិធីភ្ជាប់ពាក្យ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំ។
      </div>

      <div className="break" />

      <div className="name">
        {GROOM_FATHER} · {GROOM_MOTHER}
        <span className="relation">
          <br />
          <span className="relation-name">{GROOM_TITLE}</span>
        </span>{" "}
        <span style={{ color: "#c2a11d", fontWeight: "bold" }}>{GROOM}</span>
      </div>
      <div className="name">
        {BRIDE_FATHER} · {BRIDE_MOTHER}
        <span className="relation">
          <br />
          <span className="relation-name">{BRIDE_TITLE}</span>
        </span>{" "}
        <span style={{ color: "#c2a11d", fontWeight: "bold" }}>{BRIDE}</span>
      </div>

      <div className="break" />
      {/* 
      <Button
        onClick={() => {
          openModal({
            className: "contact-modal",
            closeOnClickBackground: true,
            header: (
              <div className="title-group">
                <div className="title">Send Your Congratulations</div>
                <div className="subtitle">
                  Call or send a message to share your congratulations.
                </div>
              </div>
            ),
            content: (
              <>
                <div className="contact-info">
                  {GROOM_INFO.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`, "_self")
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`, "_self")
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div className="contact-info">
                  {BRIDE_INFO.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`, "_self")
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`, "_self")
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
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
        Contact Us
      </Button> */}
    </LazyDiv>
  )
}
