# Typescript로 블록체인 만들기

## 0.2 Introduction and What are we building

### Typescript

- JS의 업셋
- js로 변환하여 컴파일되는 프로그래밍 언어
- 장점
  - JS에 없는 규칙이 존재
  - 쉬운 코드
  - 예측가능함

### 세팅 준비물

- nodejs
- vscode
- 터미널 설정

## 0.3 Setting Typescript Up

- `npm install typescript --save-dev` 로 설치

- tsconfig.json 로 옵션 설정
- `tsc`로 js 파일로 변경시킴
- `node`로 실행

## 0.4 First steps with Typescript

- Typed script

  - 변수 데이터 종류를 설정
  - 오류 정정

- function's argument를 `arg?`로 변경하면 option으로 취급가능하다.

## 0.5 Types in Typescript

- `arg: type`으로 타입 지정이 가능하다.
  - 함수에 마우스를 올리면 확인도 가능하다.
- 함수선언의 인자 자리에 `: type`으로 함수 반환값의 타입 지정이 가능하다.

- TSLint : 정적 분석 도구
- tsc-watch : 코드 변경을 watch하여 실행시켜줌
  - `npm install tsc-watch --save-dev` 로 설치
- src & dist로 폴더 위치 변경
  - `"include": ["src/**/*"],` : src 폴더의 모든 파일 지정
  - `"outDir": "dist"` : 변환 위치 설정
  - `"start": "tsc-watch --onSuccess \"node dist/index.js\""` : 감시 및 성공 감지 시 js 파일 실행

## 0.6 Interfaces on Typescript

```
interface Creature {
  name: string;
  age: number;
  gender: string;
}

```

- Object의 문법을 이용하여 Schema 제작 가능
  - 이 역시 하나의 타입으로 취급됨
  - 가지고 있는 필드를 자동완성 도와줌
    - 타입까지 알려준다.
