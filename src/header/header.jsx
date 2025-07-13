import React, { memo, useEffect, useState } from 'react'
import { Avatar, Dropdown } from 'flowbite-react'
import ListHeader from '../components/listHeader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/accountReducer'
export default memo(function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const acount = useSelector(state => state.account)
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => {
        setShowMenu(prev => !prev)
    }
    const logout1 = () => {
        dispatch(logout())
        navigate("../sign")
    }
    return (
        <>
            <div className='flex justify-around px-5 py-5 md:hidden'>
                <img className="w-40" src="/img/LogoQr.svg" alt="" />
                <div className='flex gap-2'>
                    <Dropdown inline={true} label={<Avatar rounded={true} />} placement='auto'>
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {`${acount.firstName} ${acount.lastName}`}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {acount.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={logout1}>
                            Logout
                            { }
                        </Dropdown.Item>
                    </Dropdown>
                    <img src="/img/Line.svg" alt="" onClick={toggleMenu} />
                </div>
            </div>
            <ListHeader className={`duration-300 h-full absolute top-0 ${showMenu ? "translate-x-0" : "-translate-x-full"}`} />
        </>
    )
}
)