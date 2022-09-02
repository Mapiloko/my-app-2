
// let db = null;
// let objectStore = null;


// export const postToDB = (data)=>{

//     const dataToBeSend = {blob: data.blob }
    
//     let tx = makeTX('imageStore', 'readwrite');
//     tx.oncomplete = (ev) => {
//       console.log("Completed");
//     };

//     let store = tx.objectStore('imageStore');
//     let request = store.add(dataToBeSend); //request an insert/add

//     request.onsuccess = (ev) => {
//       console.log('successfully added an object');
//     };
//     request.onerror = (err) => {
//       console.log('error in request to add',err);
//     };

// }

// export function delete_db() {

//   const transaction = makeTX('imageStore', 'readwrite');

//   const objectStore = transaction.objectStore("imageStore");
//   const objectStoreRequest = objectStore.clear();
//   objectStoreRequest.onsuccess = (event) => {
//     console.log('<li>DataBase Deleted successful.</li>');
//   };
// }

// export async function getAllFromDB() {
//     let request;
//     await withStore('readonly', (store) => {
//         request = store.getAll()
//     });
//     return request.result;
// }

// async function withStore(type, callback){

//     return new Promise((resolve, reject)=>{
//         const transaction = db.transaction("imageStore",type)
//         transaction.oncomplete = () => resolve();
//         transaction.onerror = () => reject(transaction.error);
//         callback(transaction.objectStore('imageStore'));
//     })
// }

// const IDB = ( function init() {
//       let DBOpenReq = indexedDB.open('ImageDB', 1);
    
//       DBOpenReq.addEventListener('error', (err) => {
//         console.warn(err);
//       });
//       DBOpenReq.addEventListener('success', (ev) => {
//         db = ev.target.result;
//         console.log('Successfully Opened db');
//       });
//       DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    
//         db = ev.target.result;
//         let oldVersion = ev.oldVersion;
//         let newVersion = ev.newVersion || db.version;
//         console.log('DB updated from version', oldVersion, 'to', newVersion);
    
//         console.log('upgraded', db);
//         if (!db.objectStoreNames.contains('imageStore')) {
//           objectStore = db.createObjectStore('imageStore', {
//             keyPath:'id', autoIncrement: true
//           });
//         }
//       });  
      
//     })();
    
    
//     function makeTX(storeName, mode) {
//       let tx = db.transaction(storeName, mode);
//       tx.onerror = (err) => {
//         console.warn(err);
//       };
//       return tx;
//     }
    
    
    export const idbRequest = (() => {
      let dbInstance;
  
      function getDB() {
          if (dbInstance) return dbInstance;
  
          dbInstance = new Promise((resolve, reject) => {
              const openreq = indexedDB.open('ImageDB', 1);
  
              openreq.onerror = () => {
                  reject(openreq.error);
              };
  
              openreq.onupgradeneeded = () => {
                  // First time setup: create an empty object store
                  openreq.result.createObjectStore('imageStore',  {
                    keyPath:'id', autoIncrement: true
                  });
              };
  
              openreq.onsuccess = () => {
                  resolve(openreq.result);
              };
          });
  
          return dbInstance;
      }
  
      async function withStore(type, callback) {
          const db = await getDB();
          return new Promise((resolve, reject) => {
              const transaction = db.transaction('imageStore', type);
              transaction.oncomplete = () => resolve();
              transaction.onerror = () => reject(transaction.error);
              callback(transaction.objectStore('imageStore'));
          });
      }
  
      return {
          async get_key(key) {
              let request;
              await withStore('readonly', (store) => {
                  request = store.get(key);
              });
              return request.result;
          },
          add_data(data) {
              const value = {blob: data.blob }
              return withStore('readwrite', (store) => {
                  const request  = store.add(value);
                  request.onsuccess = (ev) => { console.log('successfully added an object');};
                  request.onerror = (err) => { console.log('error in request to add');};
              });
          },
          clear_store(key) {
              return withStore('readwrite', (store) => {
                const request  = store.clear();
                request.onsuccess = (ev) => { console.log('Successfully cleared db');};
                request.onerror = (err) => { console.log('Error Clearing db');};
              });
          },
          async get_all() {
            let request;
              await withStore('readonly', (store) => {
                request  = store.getAll();
                request.onerror = (err) => { console.log('Error fetching data');};
              });
              return request.result
            }
      };
  })();