import axios from "axios"

export const fetchContacts = async () => {
  const response =  await axios.get(
      'https://64d27821f8d60b174362190d.mockapi.io/contacts/contacts');
    return response.data
}