import { useState, useEffect } from 'react'

export function Permission({ role, children}) {
    const [permissions, setPermissions] = useState();
    const user = localStorage.getItem('user')
    
    useEffect(() => {
        async function loadPermission() {
            role.map(r => {
                if(r == `ROLE_${user}`){ setPermissions(true) }
            })
        }
        loadPermission();
      }, [role]);
  
    return <>{permissions && children}</>;
}