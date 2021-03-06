import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import kbbi from "@/data/kbbi.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import {
  Main,
  Header,
  GameSection,
  TileContainer,
  TileRow,
  Tile,
  TileCursor,
  KeyboardSection,
  KeyboardRow,
  KeyboardButton,
  Flex,
} from "@/styled/index";
import { Modal, Alert } from "react-bootstrap";
import { useEffect, useState, useRef, useCallback } from "react";

export default function Home() {
  const [letterIndex, setLetterIndex] = useState(-1);
  const [guesses, setGuesses] = useState([null, null, null, null, null]);
  const [exclude, setExclude] = useState([]);
  const [excludePhase, setExcludePhase] = useState(false);
  const [data, setData] = useState([]);
  const [initData, setInit] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalTutorial, setShowModalTutorial] = useState(false);
  const [initLetter, setInitLetter] = useState([]);

  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
    ["Enter", "Space", "Reset", "Backspace"],
  ];

  const actionButton = ["enter", "space", "reset", "backspace"];

  const getInitLetter = () => {
    let start = 97;
    let end = 122;
    return [...Array(end - start + 1).keys()].map((x) =>
      String.fromCharCode(x + start)
    );
  };

  const limitIndex = (val) => {
    if (val > 4) {
      return 4;
    }

    if (val < -1) {
      return -1;
    }

    return val;
  };

  const eraseGuess = () => {
    let _letterIndex = letterIndex;
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[_letterIndex + 1] = null;
      return newGuesses;
    });
    setLetterIndex(limitIndex(_letterIndex - 1));
  };

  const enterGuess = (key) => {
    let _letterIndex = letterIndex;
    setGuesses((prev) => {
      const newGuesses = [...prev];
      try {
        newGuesses[_letterIndex + 1] = key.toLowerCase();
      } catch (error) {
        newGuesses[_letterIndex + 1] = key;
      }
      return newGuesses;
    });
    setLetterIndex(limitIndex(_letterIndex + 1));
  };

  const handleExcludePhase = (e) => {
    setExcludePhase(e.target.checked);
  };

  const handleExclude = (key) => {
    let letter = key.toLowerCase();
    if (exclude.includes(letter)) {
      setExclude((prev) => prev.filter((e) => e !== letter));
    } else {
      setExclude((prev) => {
        let newExclude = [...prev];
        newExclude.push(letter);
        return newExclude;
      });
    }
  };

  const resetData = () => {
    setGuesses([null, null, null, null, null]);
    setExclude([]);
    setData(initData);
    setExcludePhase(false);
    setLetterIndex(-1);
  };

  const handleClickTile = (val) => {
    setLetterIndex(val - 1);
  };

  const handleClick = (key) => {
    key = key.toLowerCase();
    if (excludePhase && !actionButton.includes(key)) {
      handleExclude(key);
    } else if (getInitLetter().includes(key) || actionButton.includes(key)) {
      switch (key) {
        case "backspace":
          eraseGuess();
          break;

        case "space":
          enterGuess(null);
          break;

        case "enter":
          mainProcess();
          setShowModal(true);
          break;

        case "reset":
          resetData();
          break;

        default:
          enterGuess(key);
          break;
      }
    }
  };

  const mainProcess = () => {
    let result = [];
    initData.forEach((item) => {
      let word = item.toLowerCase().split("");
      let isMatch = true;

      let index = 0;
      for (let x of guesses) {
        if (exclude.includes(word[index])) {
          isMatch = false;
          break;
        }
        if (x === null) {
          word[index] = null;
        }

        if (x !== word[index]) {
          isMatch = false;
          break;
        }
        index++;
      }

      if (isMatch) {
        result.push(item);
      }
    });
    setData(result);
  };

  const keyPress = useCallback(
    (e) => {
      let key = e.key === " " ? "space" : e.key;
      if (
        actionButton.includes(key.toLowerCase()) ||
        getInitLetter().includes(key.toLowerCase())
      ) {
        handleClick(key);
      } else if (key.toLowerCase() === "capslock") {
        setExcludePhase(!excludePhase);
      }
    },
    [letterIndex, excludePhase, exclude]
  );

  useEffect(() => {
    let result = [];
    kbbi.forEach((element) => {
      if (element.keyword.length === 5) {
        result.push(element.keyword.toLowerCase());
      }
    });
    setData(result);
    setInit(result);
    setShowModalTutorial(true);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      <Main>
        <Head>
          <title>Katla Herlper</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header>
          KATLA - HELPER
          <button
            onClick={() => setShowModalTutorial(true)}
            className="btn btn-link float-right"
          >
            <FontAwesomeIcon icon={faWarning} style={{ color: "red" }} />
          </button>
        </Header>
        <br />
        <br />
        <GameSection>
          <TileContainer>
            <TileRow>
              {[0, 1, 2, 3, 4].map((i) => (
                <Tile onClick={() => handleClickTile(i)} key={i}>
                  {guesses[i]}
                </Tile>
              ))}
            </TileRow>
            <TileRow>
              {[0, 1, 2, 3, 4].map((i) => (
                <TileCursor key={i}>{i == letterIndex + 1 && "^"}</TileCursor>
              ))}
            </TileRow>
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleClick("enter")}
              >
                {"Tampilkan saran"}
              </button>
            </div>
          </TileContainer>
        </GameSection>
        <div className="form-group row">
          <div className="form-check float-right">
            <input
              className="form-check-input"
              checked={excludePhase}
              onChange={(e) => handleExcludePhase(e)}
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              {"Atur huruf yang dikecualikan [Capslock]"}
            </label>
          </div>
        </div>
        <KeyboardSection>
          {keyboardRows.map((keys, i) => (
            <KeyboardRow key={i}>
              {keys.map((key) => (
                <KeyboardButton
                  key={key}
                  onClick={() => handleClick(key)}
                  primary={exclude.includes(key)}
                >
                  {key}
                </KeyboardButton>
              ))}
            </KeyboardRow>
          ))}
        </KeyboardSection>
      </Main>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Saran Jawaban</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {data.length === 0 ? (
              <Alert variant="danger">Hasil tidak ditemukan.</Alert>
            ) : (
              data.map((item, index) => (
                <div key={index} className="col-sm-2">
                  {item}
                </div>
              ))
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalTutorial}
        onHide={() => setShowModalTutorial(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>{`Ketuk salah satu kotak dan masukan huruf.`}</li>
            <li>
              {`Biarkan kosong atau tekan "space" untuk kotak yang tidak ingin
              ditebak.`}
            </li>
            <li>
              {`Ceklis "Atur huruf yang dikecualikan" atau tekan "capslock" pada keyboard untuk menambah daftar huruf yang
              dikecualikan.`}
            </li>
            <li>
              {`Huruf yang dikecualikan akan berwarna merah pada keyboard.`}
            </li>
            <li>
              {`Untuk menghapus huruf dari daftar yang dikecualikan, tekan keyboard yang berwarna merah dalam posisi "Atur huruf yang dikecualikan" terceklis.`}
            </li>
            <li>
              {`Tekan "enter". Jika sudah, program akan menampilkan saran jawaban.`}
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}
