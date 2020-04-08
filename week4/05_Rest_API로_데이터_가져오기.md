# Rest API로 데이터 가져오기

## 사용 방법

```jsx
axios.get('경로', {headers: `Bearer ${token}` })
axios.post('경로', body, {headers: `Bearer ${token}` })
axios.patch('경로', body, {headers: `Bearer ${token}` })
axios.delete('경로', {headers: `Bearer ${token}` })
```

## 데이터 가져오기 

+ 인증을 통과하면 토큰을 갖도록 함

+ ./src/hocs/withAuth.js 수정

  ```jsx
  import React from "react";
  import { Redirect } from "react-router-dom";
  
  export default function withAuth(Component) {
    function WrapperComponent(props) {
      const token = localStorage.getItem("token");
  
      if (token === null) {
        return <Redirect to="/signin" />;
      }
      return <Component {...props} token={token} />;
    }
  
    WrapperComponent.displayName = `withAuth(${Component.name});`;
  
    return WrapperComponent;
  }
  
  ```

+ ./src/pages/Home.jsx 수정

  ```jsx
  /* ./src/pages/Home.jsx */
  
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  
  function Book(props) {
    return <div>title: {props.title}</div>;
  }
  
  const Home = ({ token }) => {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      console.log(token);
      axios
        .get("https://api.marktube.tv/v1/book", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setBooks(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);
  
    return (
      <div>
        <h1>Home</h1>
        {books.map((book) => (
          <Book title={book.title} key={book.bookId} />
        ))}
      </div>
    );
  };
  
  export default Home;
  ```

  