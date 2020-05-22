<div align="center">
  <img width="50%" src="./cover.png" alt="Awesome">
  <br>
  <hr />
</div>

React Collector help you to declere and manage a browser's storage.

## Contents <!-- omit in toc -->
- [Installation](#installation)
- [useCollector](#useCollector)
- [Actions](#actions)
- [Usage](#usage)
- [Full Example](#full-example)
- [Todo](#todo)


## Installation
Using npm
```bash
npm i --save react-collector
```
## useCollector
useCollector allowing to get collector's props: **storage**, **session** & **cookies**

| Prop | Description |
| --- | --- |
| storage | Allows you to access a Storage object for the Document's origin |
| session | Use the sessions API to list, and restore, tabs and windows that have been closed while the browser has been running. 
| cookies | Enables extensions to get and set cookies, and be notified when they change.
| uuid | Generate RFC-compliant UUIDs in JavaScript


## Actions
| Action | Prop | Promise |
| --- | --- | --- |
| add | key, payload | ActionResult
| get | T, key | T
| remove | key | ActionResult
| clear | -- | ActionResult


## Usage
#### Add Object to Collector

```ts
interface User {
  name?: string;
  email?: string;
  age?: number;
  created?: Date;
  active?: boolean;
}
```


```ts
let user: User = {
  name: "Tomasz Mayer",
  email: "tm@gmail.com",
  age: 35,
  created: new Date()
};
```
```tsx
const {uuid,storage,session,cookies} = useCollector();

 storage.add(uuid(),user)
        .then((res:ActionResult)=>{
            // success:true
            // message:The object was added to session successfuly
        }).catch(err=>{

        })

 session.add(uuid(),user);
 cookies.add(uuid(),user);

```
#### Add Primitive Type to Collector
```ts
storage.add("some-key","some-value")
session.add(1,true),
cookies.add(2,new Date())
```

#### Get Object from Collector
```tsx

storage.get("1f4a6aa4...")
       .then((user: User) => {
          console.log(user);
            /*{
                name: "Tomasz Mayer",
                email: "tm@gmail.com",
                age: 35,
                created: "2020-05-22T08:00:23.510Z"
              }*/
        })
        .catch((err:any)=>{
          //Handle the error
        });
```
Same for session and cookies
```tsx
session.get("1f4a6aa4...")
       .then((user: User) => {
         ...
       });
```
```tsx
cookies.get("1f4a6aa4...")
       .then((user: User) => {
         ...
       });
```
Get Primitive Type
```tsx
storage.get("some-key").then((res:string)=>{
  console.log(res)
  //some-value
})
session.get(1,true).then((res:bool)=>{
  ...
}),
cookies.get(2,new Date()).then((res:Date)=>{

});
```

#### Remove Element from Collector
```tsx
storage.remove("1f4a6aa4...")
       .then((res:ActionResult)=>{
         /* res =>
          success: true,
          message: The object removed successfuly
         */

       })

// Same for session and cookies
session.remove("1f4a6aa4...")
       .then((res:ActionResult)=>{...})

cookies.remove("1f4a6aa4...")
       .then((res:ActionResult)=>{...})
```

#### Clear Collector
```tsx
cookies.clear().then((res:ActionResult)=>{
  ...
})

//Same for storage and session
session.clear().then((res:ActionResult)=>{
  ...
})

storage.clear().then((res:ActionResult)=>{
  ...
})
```
## Full Example

#### Root Component
```tsx
import React from 'react';
import ReactCollector from 'react-collector';

const App: React.SFC<{}> = () => {
  return (
    <ReactCollector>
        <SomeChild />
    </ReactCollector>
    );
}
 
export default App;
```

Child component

```tsx
import React from "react";
import { useCollector } from "react-collector";

interface User {
  name?: string;
  email?: string;
  age?: number;
  created?: Date;
  active?: boolean;
}

let user: User = {
  name: "Tomasz Mayer",
  email: "tm@gmail.com",
  age: 35,
  created: new Date()
};

const SomeChild: React.SFC<{}> = () => {
  const { uuid, storage,session,cookies } = useCollector();

  storage.get("1f4a6aa4-9e04-4334-9a7f-3bf90827064b").then((user: User) => {
    session.add(user.name,user.active)
  });

  return (
    <button
      onClick={() => {
        storage.add(uuid(), {
          name: "Tomasz Mayer",
          email: "tm@gmail.com",
          age: 35,
          created: new Date()
        });
      }}
    ></button>
  );
};

export default SomeChild;

```
## Todo
- Collector for indexedDB
- Collector for Web SQL