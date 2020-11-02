// homework1


const delay = ms => {
  const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
          if(ms){
              resolve(ms)
          }
          reject(ms)
      },ms)
  })
  return promise
} ;


const logger = time => console.log(`Resolved after ${time}ms`);

// Вызовы функции для проверки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms

//homework2
const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName, callback) => {
    const promise = new Promise((res,rej)=>{
        setInterval(()=>{
          const updatedUsers = allUsers.map((user) =>
                user.name === userName ? { ...user, active: !user.active } : user
              );
            res(updatedUsers);
        },0)
    })
    return promise;
};

  const loggerr = (updatedUsers) => console.table(updatedUsers);

/*
 * Сейчас работает так
 */
//   toggleUserState(users, 'Mango', logger);
//   toggleUserState(users, 'Lux', logger);

/*
 * Должно работать так
 */
toggleUserState(users, 'Mango').then(loggerr);
toggleUserState(users, 'Lux').then(loggerr);

//homework 3
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction, onSuccess, onError) => {
  const delay = randomIntegerFromInterval(200, 500);
return new Promise((res, rej) => {

    setTimeout(() => {
        const canProcess = Math.random() > 0.3;

        if (canProcess) {
            res({id: transaction.id, time: delay});
          } else {
              rej(transaction.id);
          }
      }, delay);
  })
};

const logSuccess = ({id, time}) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};


makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);