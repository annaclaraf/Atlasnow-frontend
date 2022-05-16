import { useState } from "react";
import { Link } from "react-router-dom";

import './style.css'

export function Sidebar() {
    const [open, setOpen] = useState(false);

    async function handleMenu() {
        try {
            if (open) {
                setOpen(false)
            }
            else {
                setOpen(true);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <aside className={open ? 'open' : 'close'}>
            <div className={open ? 'open' : 'close'}>
                <div className='div'>
                    <h1>Ola User</h1>

                    <button onClick={handleMenu}>
                        <svg width="40" height="20" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" width="51" height="8" rx="4" fill="#727272" />
                            <rect x="0.5" y="12" width="51" height="8" rx="4" fill="#727272" />
                            <rect x="0.5" y="24" width="51" height="8" rx="4" fill="#727272" />
                        </svg>
                    </button>
                </div>

                <hr />

                <div className='links'>
                    <Link to='/home'>HOME</Link><br />
                    <Link to='/funcionarios'>FUNCIONARIOS</Link><br />
                    <Link to='/emissores'>EMISSORES</Link>
                </div>
            </div>
        </aside>
    );
}