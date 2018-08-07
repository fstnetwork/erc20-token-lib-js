import createKeccakHash from "keccak";

export function getKeccak256Hash(str) {
  return prependZero(
    createKeccakHash("keccak256")
      .update(str)
      .digest("hex")
  );
}

export function prependZero(str) {
  if (str.startsWith("0x")) {
    return str;
  }

  return "0x" + str;
}

export function removePrependedZero(str) {
  if (str.startsWith("0x")) {
    return str.replace("0x", "");
  }

  return str;
}

export function prependZeros(str, totalLength) {
  let tmpStr = removePrependedZero(str);

  if (totalLength === undefined || totalLength === null) {
    return tmpStr;
  }

  const originLength = tmpStr.length;

  if (originLength > totalLength) {
    return tmpStr;
  }

  for (let i = 0; i < totalLength - originLength; i++) {
    tmpStr = "0" + tmpStr;
  }

  return tmpStr;
}

export function prepend64Zeros(str) {
  return prependZeros(str, 64);
}
