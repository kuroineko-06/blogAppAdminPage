import React, {useState} from 'react'
import NavBar from './NavBar';
import SearchForm from './SearchForm';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';



export default function NavBar_Search_Component() {

    const [closedNav, setClosedNav] = useState(false)
    const toggleNav = () => {
        setClosedNav(!closedNav)
    }

    const getNavWidth = () => (closedNav ? 'w-16' : 'w-56')

    return (
        <div className="flex">
            {/* navbar */}
            <div className={getNavWidth() + " min-h-screen transition-width border border-r"}>
                <div className="sticky top-0">
                    <NavBar closed={closedNav} />
                </div>

            </div>

            {/* content */}
            <div className="flex-1 bg-gray-100">
                <div className=" top-0">
                    <div className="flex item-center p-2 space-x-2">
                        <button onClick={toggleNav}>
                            {closedNav ? (
                                <AiOutlineMenuFold size={25} />
                            ) : (
                                <AiOutlineMenuUnfold size={25} />
                            )}
                        </button>
                        <SearchForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
