import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreePage from './pages/LinkTreePage'
import ProfilePage from './pages/ProfilePage'
import HandlePage from './pages/HandlePage'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkTreePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/:handle" element={<AuthLayout />}>
          <Route index={true} element={<HandlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
