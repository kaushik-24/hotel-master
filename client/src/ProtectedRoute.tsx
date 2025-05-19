import AdminTemplate from '@ui/admin/template/AdminTemplate';
import encryptDecrypt from 'function/encryptDecrypt';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = () => {
    const token = encryptDecrypt.decrypt(localStorage.getItem('accessTokenHotelVenus') as string) || encryptDecrypt.decrypt(sessionStorage.getItem('accessTokenHotelVenus') as string)
    if (token) {
        return <AdminTemplate />;
    } else
        return <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;