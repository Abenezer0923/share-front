// ... (other imports)

import { useParams } from 'react-router-dom';
import axios from 'axios';

// ... (other functions)

export function useResetPassword() {
  const { id, token } = useParams();

  const resetPassword = async ({ password }) => {
    try {
      const { data, status } = await axios.post(
        `http://localhost:2020/authapi/reset_password/${id}/${token}`,
        { password: password }
      );
      return Promise.resolve({ data, status });
    } catch (error) {
      return Promise.reject({ error });
    }
  };

  return { resetPassword };
}
