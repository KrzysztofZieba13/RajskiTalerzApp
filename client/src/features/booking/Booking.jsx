import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import FormPage from "../../ui/FormPage";
import styles from "./Booking.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useCreateBookingMutation } from "../../services/bookings";
import Spinner from "../../ui/Spinner";
import { useIsLoggedInQuery } from "../../services/auth";
import { useSetTitle } from "../../hooks/useSetTitle";

function Booking() {
  const { mutate: book, isLoading } = useHandleMutation(
    useCreateBookingMutation(),
    "Prośba rezerwacji została wysłana"
  );
  useSetTitle("Rezerwacja Stolika");
  const { data: userRes, isLoading: isLoadingUser } = useIsLoggedInQuery();
  const [guestsNumber, setGuestNumber] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingComment, setBookingComment] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  if (isLoadingUser) return <Spinner />;

  const userRole = userRes.user.role;
  const isWaiterOrAdmin = userRole === "waiter" || userRole === "admin";

  function handleBooking(e) {
    e.preventDefault();

    const data = {
      guestsNumber,
      bookingDate,
      bookingComment,
      clientName,
      clientEmail,
    };
    book(data);

    setGuestNumber(1);
    setBookingDate("");
    setBookingComment("");
    setClientName("");
    setClientEmail("");
  }

  return (
    <FormPage
      img={<img src="../auth-img.jpg" alt="Obraz przedstawiający logowanie" />}
      subtitle="Nie trać czasu, zarezerwuj stolik"
      title="Rezerwacja"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <CustomForm onSubmit={handleBooking}>
          <div className={styles.datePicker}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <label>Data</label>
              <DateTimePicker
                value={dayjs(bookingDate)}
                onChange={(value) => setBookingDate(value)}
                slotProps={{
                  textField: {
                    inputProps: { placeholder: "" },
                    sx: {
                      "& .MuiInputBase-input": {
                        fontSize: "2.4rem",
                        textAlign: "right",
                        paddingBottom: "0",
                      },
                      "& .MuiOutlinedInput-root": {
                        border: "none",
                        "& fieldset": {
                          border: "none",
                        },
                        paddingBottom: "0",
                      },
                      "& .MuiButtonBase-root": {
                        alignSelf: "center",
                      },
                    },
                  },
                  openPickerIcon: {
                    sx: {
                      fontSize: "3.2rem",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <div className={styles.select}>
            <label htmlFor="person-count">Liczba osób</label>
            <select
              id="person-count"
              defaultValue={1}
              onChange={(e) => setGuestNumber(e.target.value)}
            >
              <option value={1}>1 osoba</option>
              <option value={2}>2 osoby</option>
              <option value={3}>3 osoby</option>
              <option value={4}>4 osoby</option>
              <option value={5}>5 osób</option>
              <option value={6}>6 osób</option>
              <option value={7}>7 osób</option>
              <option value={8}>8 osób</option>
            </select>
          </div>
          <div>
            <label htmlFor="bookingComment">Komentarz</label>
            <textarea
              id="bookingComment"
              value={bookingComment}
              onChange={(e) => setBookingComment(e.target.value)}
            />
          </div>
          {isWaiterOrAdmin && (
            <>
              <div>
                <label htmlFor="clientName">Imię</label>
                <input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="clientEmail">Email</label>
                <input
                  id="clientEmail"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
            </>
          )}
          <Button bgColor="#ee4e4e" size="md">
            Rezerwuj
          </Button>
        </CustomForm>
      )}
    </FormPage>
  );
}

export default Booking;
