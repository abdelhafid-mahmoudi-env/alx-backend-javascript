interface MajorCredits {
  credits: number;
  _majorBrand: "major";
}

interface MinorCredits {
  credits: number;
  _minorBrand: "minor";
}

function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
  return {
      credits: subject1.credits + subject2.credits,
      _majorBrand: "major"
  };
}

function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
  return {
      credits: subject1.credits + subject2.credits,
      _minorBrand: "minor"
  };
}

const major1: MajorCredits = { credits: 3, _majorBrand: "major" };
const major2: MajorCredits = { credits: 5, _majorBrand: "major" };
const majorSum = sumMajorCredits(major1, major2);
console.log(`Total Major Credits: ${majorSum.credits}`);

const minor1: MinorCredits = { credits: 2, _minorBrand: "minor" };
const minor2: MinorCredits = { credits: 3, _minorBrand: "minor" };
const minorSum = sumMinorCredits(minor1, minor2);
console.log(`Total Minor Credits: ${minorSum.credits}`);
