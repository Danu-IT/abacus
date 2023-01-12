import { useState } from "react";
import frameRed from "./images/frameRed.png";
import frameWhite from "./images/frameWhite.png";
import boneBlue from "./images/boneBlue.png";
import boneOrange from "./images/boneOrange.png";
import { useEffect } from "react";
import { UUID } from "uuid-generator-ts";
import styled from "styled-components";

interface Game {
  frame: any;
  length: string;
  bone: any;
  countBones: string;
}

const App = () => {
  const bones = ["orange", "blue"];
  const frames = ["white", "red"];
  const [bone, setBone] = useState<string>("orange");
  const [frame, setFrame] = useState<string>("white");
  const [length, setLength] = useState<string>("10");
  const [countBones, setCountBones] = useState<string>("2");
  const [game, setGame] = useState<Game>({
    frame: frameWhite,
    length: length,
    bone: boneOrange,
    countBones: countBones,
  });
  const [arrFrame, setArrFrame] = useState<any[]>([]);
  const [arrBone, setArrBone] = useState<any[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  const choiceFrame = () => {
    if (frame === "white") setGame({ ...game, frame: frameWhite });
    else if (frame === "red") setGame({ ...game, frame: frameRed });
  };

  const choiceBone = () => {
    if (bone === "orange") setGame({ ...game, bone: boneOrange });
    else if (bone === "blue") setGame({ ...game, bone: boneBlue });
  };

  const heightCalculation = (height: number) => {
    let heightFrame = [];
    let heightCount = height;
    for (let i = 0; i < arrBone.length; i++) {
      heightFrame[i] = heightCount;
      heightCount += height + 4;
    }
    return heightFrame;
  };

  useEffect(() => {
    choiceBone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bone]);

  useEffect(() => {
    choiceFrame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame]);

  useEffect(() => {
    setGame({ ...game, countBones: countBones });
    setArrBone([]);
    for (let i = 0; i < +countBones; i++) {
      setArrBone((prev) => [...prev, { id: new UUID() }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countBones]);

  useEffect(() => {
    setHeights(heightCalculation(20));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrBone]);

  useEffect(() => {
    setGame({ ...game, length: length });
    setArrFrame([]);
    for (let i = 1; i <= +length; i++) {
      setArrFrame((prev) => [...prev, { id: new UUID() }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  return (
    <div className="App">
      <div className="Color">
        <span>Выбрать цвет косточки</span>
        <select onChange={(e) => setBone(e.target.value)}>
          {bones.map((bone, index) => (
            <option value={bone} key={index}>
              {bone}
            </option>
          ))}
        </select>
      </div>
      <div className="Frame">
        <span>Выбрать рамку</span>
        <select onChange={(e) => setFrame(e.target.value)}>
          {frames.map((frame, index) => (
            <option value={frame} key={index}>
              {frame}
            </option>
          ))}
        </select>
      </div>
      <div className="Length">
        Введите длину абакуса
        <input
          type="number"
          min="1"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        ></input>
      </div>
      <div className="CountBone">
        Введите кол-во косточек
        <input
          type="number"
          min="1"
          max="8"
          value={countBones}
          onChange={(e) => setCountBones(e.target.value)}
        ></input>
      </div>
      <AbacusContainer className="abacus">
        {arrFrame.map((frame, index) => (
          <Frame key={index}>
            <img src={game.frame} alt="frame" />
            <Bone bottom="275px" src={game.bone} />
            {arrBone.map((bone, i) => (
              <Bone key={i} bottom={`${heights[i]}px`} src={game.bone} />
            ))}
          </Frame>
        ))}
      </AbacusContainer>
    </div>
  );
};

const AbacusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Frame = styled.div`
  position: relative;
`;

interface CustomBone {
  src?: string;
  alt?: string;
  bottom?: string;
}

const Bone = styled.img<CustomBone>`
  position: absolute;
  bottom: ${(p) => p.bottom};
  left: 15px;
  z-index: 10;
  height: 20px;
`;

export default App;
