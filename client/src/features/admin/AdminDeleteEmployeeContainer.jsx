import { useHandleMutation } from "../../hooks/useHandleMutation";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../services/users";
import ButtonUnderline from "../../ui/ButtonUnderline";
import Spinner from "../../ui/Spinner";
import AdminCard from "./AdminCard";
import styles from "./AdminDeleteEmployeeContainer.module.css";

function AdminDeleteEmployeeContainer() {
  const { data: employeesRes, isLoading } = useGetAllEmployeesQuery();
  const { mutate: deleteEmployee, isLoading: isDeletingEmployee } =
    useHandleMutation(useDeleteEmployeeMutation(), "Usunięto pracownika");

  if (isLoading) return <Spinner />;
  const employees = employeesRes.data;

  return (
    <div>
      <h2>Usuń pracownika</h2>
      <div className={styles.employeesToDelete}>
        {employees.map((emp) => (
          <AdminCard key={emp._id}>
            <p className={styles.name}>{`${emp.name} ${emp.surname}`}</p>
            <p className={styles.role}>{emp.role}</p>
            <p className={styles.email}>{emp.email}</p>
            <ButtonUnderline
              color="#ee4e4e"
              onClick={() => deleteEmployee(emp._id)}
            >
              {isDeletingEmployee ? "Usuwanie..." : "Usuń"}
            </ButtonUnderline>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

export default AdminDeleteEmployeeContainer;
