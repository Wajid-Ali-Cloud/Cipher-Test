import React, { useState } from "react";

// MUI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// Third Part
import { Formik } from "formik";

import Items from "./Items";

function AddTax() {
  return (
    <div>
      <h2>Add Tax</h2>
      <Formik
        initialValues={{
          applicable_items: [],
          applied_to: "all",
          name: "",
          rate: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm({ values: "" });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  className="text-orange"
                />
                {errors.name && touched.name ? (
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {errors.name}
                  </p>
                ) : null}
              </Grid>

              <Grid item xs={3}>
                <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Rate
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="rate"
                    required
                    value={values.rate}
                    onChange={handleChange("rate")}
                    onBlur={handleBlur("rate")}
                    type="number"
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    label="rate"
                  />
                </FormControl>
                {errors.rate && touched.rate ? (
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {errors.rate}
                  </p>
                ) : null}
              </Grid>
            </Grid>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={values.applied_to}
                name="applied_to"
                values={values.applied_to}
                onChange={handleChange("applied_to")}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Apply to all items in collection"
                />
                <FormControlLabel
                  value="some"
                  control={<Radio />}
                  label="Apply to specific items"
                />
              </RadioGroup>
            </FormControl>
            <hr />

            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Items"
                inputProps={{ "aria-label": "search items" }}
              />
            </Paper>
            <Items
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={values}
            />
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default AddTax;
