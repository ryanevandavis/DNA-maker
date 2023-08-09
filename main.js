// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }

const pAequorFactory = (number, dnaArray) => ({
    specimenNum: number,
    dna: dnaArray,

    //outputs another dna to test against
    compareDna(param) {
        let identicalBases = 0;

        for (let i = 0; i < this.dna.length; i++) {
            if (this.dna[i] === param.dna[i]) {
                identicalBases++; //add 1 every time they match
            }
        }

        const totalLength = this.dna.length + param.dna.length;
        const percentInCommon = ((identicalBases / totalLength) * 100).toFixed(2);

        return console.log(`specimen #${this.specimenNum} and specimen #${param.specimenNum} have ${percentInCommon}% DNA in common`);
    },

    //if 60% dna C or G then they prob surviving boi
    willLikelySurvive() {
        const cCount = this.dna.filter(cBase => cBase === 'C').length;
        const dCount = this.dna.filter(dBase => dBase === 'D').length;
        const totalLength = this.dna.length;

        return (cCount / totalLength) >= 0.6 || (dCount / totalLength) >= 0.6;
    },

    //mutates a single index in a object
    mutate() {
        const randomIndex = Math.floor(Math.random() * this.dna.length);
        let randomBase = returnRandBase();

        while (this.dna[randomIndex] === randomBase) {
            randomBase = returnRandBase();
        }
        this.dna[randomIndex] = randomBase;
        return this.dna; 
    }
});

const survivingInstances = [];
//generate a bunch of things
for (let i = 1; survivingInstances.length < 30; i++) {
    const instances = pAequorFactory(i, mockUpStrand());
    if (instances.willLikelySurvive()) {
        survivingInstances.push(instances);
    }
}
  
//Lot's-o-checks
const ex1 = pAequorFactory(1, mockUpStrand());
console.log(ex1.dna); //added .dna removing other junk

ex1.mutate();
console.log(ex1.dna);

const ex2 = pAequorFactory(2, mockUpStrand());
console.log(ex2.dna);

ex1.compareDna(ex2);

console.log(`Likely to survive: ${ex1.willLikelySurvive()}`);

survivingInstances.forEach(instances => {
    console.log(`Specimen #${instances.specimenNum} can likely survive.`);
});