import faker from '@faker-js/faker'

const PeopleFaker = () => {
  const addPeople = async () => {
    for (let i = 0; i < 5; i++) {
      const peoples = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        emailAddress: faker.internet.email(),
        numberPhone: faker.phone.phoneNumberFormat(),
        address: faker.address.streetAddress()
      }
  
      const generate = await fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(peoples)
      })
  
      const generateResponse = await generate.json()
      console.log(generateResponse)
    }
  }
  return (
    <div>
      <button type="button" onClick={() => addPeople()}>Generate</button>
    </div>
  );
}

export default PeopleFaker;
