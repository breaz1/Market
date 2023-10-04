import React from 'react'
import { useSelector } from 'react-redux'

const ProfileInfo = () => {
  const user = useSelector((state) => state.user)

  return (
        <div className="user-info-win">
            <div>
                <h1 className="info-profile-field">Почта:</h1>
                <h1 className="info-profile-title">{user.email}</h1>
            </div>
            <div>
                <h1 className="info-profile-field">Организация:<br /></h1>
                <h1 className="info-profile-title">{user.organization}</h1>

            </div>

        </div>
  )
}

export { ProfileInfo }
