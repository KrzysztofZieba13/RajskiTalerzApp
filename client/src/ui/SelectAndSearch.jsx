import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import styles from "./SelectAndSearch.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";

function SelectAndSearch({
  onSubmit,
  disableForFuture = false,
  disableForPast = false,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelectDate(newDate) {
    const formatedDate = newDate.format("YYYY-MM-DD");
    setSearchParams({ date: formatedDate });
  }

  return (
    <form className={styles.selectAndSearch} onSubmit={(e) => onSubmit(e)}>
      <div className={styles.datePicker}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label>Data</label>
          <DatePicker
            value={dayjs(searchParams.get("date")) || ""}
            onChange={(value) => handleSelectDate(value)}
            disableFuture={disableForFuture}
            disablePast={disableForPast}
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
      <Button>Szukaj</Button>
    </form>
  );
}

export default SelectAndSearch;
