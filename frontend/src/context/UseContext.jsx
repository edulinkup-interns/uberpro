import React, { createContext , useState } from 'react'

// to isme ye ho raha hai ki jab bhi hamara user ayega to wo sabse pahle apna data loginform me dalega jab wo sara data dal dega to wo data
// idhar userdatacontext lelega wo sare data ko usecontext ke dwara banye gaye schema me captue kar lega abb agar dashboard ya koi bhi dure ko data cahiye to
// wo yaha se fech kar sakta hai bina kisi dikkat ke agar hum sidhe data loginform se dashboard or dusro ke bejte to yaha hame multiple props likhne padte 
// is wajh se prop drilling ho jati hai so we use usecontext in this. 
export const Userdatacontext = createContext();
 
const UseContext = ({children}) => {

    const [user, setUser] = React.useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: ''
    });
  return (
    <div>
        {/* jo bhi data muje apne page tak provide karna wo acche tarike se provide ho jayega */}
      <Userdatacontext.Provider value={{user , setUser}}>    
        {children}
      </Userdatacontext.Provider>
    </div>
  )
}

export default UseContext
