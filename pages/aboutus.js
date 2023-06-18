import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Aboutus() {
   const { data: session } = useSession();
   return <Layout>
      <div className="text-blue-900 flex justify-between">
         Розроблено до дипломного проекту студентом групи КІ-406 ВСП "ТФК ТНТУ" Годованим Олександром
      </div>
   </Layout>
}