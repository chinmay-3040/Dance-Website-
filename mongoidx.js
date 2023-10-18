const mongoose = require('mongoose');
main().catch(err=>
    console.log(err)
)
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chinmay')
}
main().then(()=>{
    console.log("MongoDB connected")
})


const kittySchema = new mongoose.Schema({
    name: String
});

const carSchema = new mongoose.Schema({
    name: String,
    price: Number
});



// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : 'I don\'t have a name';
    console.log(greeting);
  };
  

  // Schema is compiled into model
const Kitten = mongoose.model('kitten', kittySchema);  // name of the collection becomes kittens (with kittySchema applied)
const Car = mongoose.model('Car', carSchema);

  //Verifying Results
  //1.Doremon
  const Doremon = new Kitten({ name: 'Doremon' });
  console.log(Doremon.name); 
  Doremon.save();
  Doremon.speak();

  //2.Doremi
  const Doremi = new Kitten({ name: 'Doremi' });
  console.log(Doremi.name);  // "Meow name is fluffy"
  Doremi.save();
  Doremi.speak();


  //3.Lambo
  const lambo = new Car({name: 'Lamborghini Sian', price : 250000000});
  lambo.save();
  //4.Buggati
  const Bugga = new Car({name: 'Buggati Chiron', price : 300000000});
  Bugga.save();


