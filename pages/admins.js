import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import Spinner from "@/components/Spinner";
import { prettyDate } from "@/lib/date";

function AdminsPage({ swal }) {
   const [email, setEmail] = useState('');
   const [adminEmails, setAdminEmails] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   function addAdmin(ev) {
      ev.preventDefault();
      axios.post('/api/admins', { email }).then(res => {
         console.log(res.data);
         swal.fire({
            title: 'Адміністратор створений!',
            icon: 'Успішно',
         });
         setEmail('');
         loadAdmins();
      }).catch(err => {
         swal.fire({
            title: 'Помилка!',
            text: err.response.data.message,
            icon: 'error',
         });
      });
   }
   function deleteAdmin(_id, email) {
      swal.fire({
         title: 'Ви точно хочете?',
         text: `Ви хочете видалити анміністратора ${email}?`,
         showCancelButton: true,
         cancelButtonText: 'Відмінити',
         confirmButtonText: 'Так , Видалити!',
         confirmButtonColor: '#d55',
         reverseButtons: true,
      }).then(async result => {
         if (result.isConfirmed) {
            axios.delete('/api/admins?_id=' + _id).then(() => {
               swal.fire({
                  title: 'Адмін видалиний!',
                  icon: 'успішно',
               });
               loadAdmins();
            });
         }
      });
   }
   function loadAdmins() {
      setIsLoading(true);
      axios.get('/api/admins').then(res => {
         setAdminEmails(res.data);
         setIsLoading(false);
      });
   }
   useEffect(() => {
      loadAdmins();
   }, []);
   return (
      <Layout>
         <h1>Адміністратори</h1>
         <h2>Додати нового адміністратора</h2>
         <form onSubmit={addAdmin}>
            <div className="flex gap-2">
               <input
                  type="text"
                  className="mb-0"
                  value={email}
                  onChange={ev => setEmail(ev.target.value)}
                  placeholder="exemple@gmail.com" />
               <button
                  type="submit"
                  className="btn-primary py-1 whitespace-nowrap">
                  Додати
               </button>
            </div>
         </form>

         <h2>Адмістрація</h2>
         <table className="basic">
            <thead>
               <tr>
                  <th className="text-left">Пошта</th>
                  <th></th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {isLoading && (
                  <tr>
                     <td colSpan={2}>
                        <div className="py-4">
                           <Spinner fullWidth={true} />
                        </div>
                     </td>
                  </tr>
               )}
               {adminEmails.length > 0 && adminEmails.map(adminEmail => (
                  <tr>
                     <td>{adminEmail.email}</td>
                     <td>
                        {adminEmail.createdAt && prettyDate(adminEmail.createdAt)}
                     </td>
                     <td>
                        <button
                           onClick={() => deleteAdmin(adminEmail._id, adminEmail.email)} className="btn-red">Видалити</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </Layout>
   );
}

export default withSwal(({ swal }) => (
   <AdminsPage swal={swal} />
));