import React, { memo, useRef, useState } from 'react'
import { Dropdown, Avatar } from 'flowbite-react'
import {setAcount} from "../redux/accountReducer"
import { useDispatch,useSelector } from 'react-redux'
import {logout} from "../redux/accountReducer"
import {useNavigate} from "react-router-dom"
export default memo( function Nav() {
    const [typeShearch, setTypeShearch] = useState('Module')
    const shearch=useRef()
    const dispath=useDispatch()
    const account=useSelector(state=>state.account)
    const navigate=useNavigate()
    const logout1=()=>{
        dispath(logout())
        navigate("../sign/signin")
    }
    return (
        <div className='flex justify-around items-center py-4 w-full md:bg-secondary'>  
            <img className="hidden md:block w-52" src="/img/LogoQr.svg" alt="" />
            <div className='gap-2 hidden md:block'>
                <Dropdown inline={true} label={<Avatar rounded={true} />} placement='auto'>
                    <Dropdown.Header>
                        <span className="block text-sm">
                            {account.lastName} {account.firstName}
                        </span>
                        <span className="block truncate text-sm font-medium">
                           {account.email}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={logout1}>
                        Logout
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    )
}
)