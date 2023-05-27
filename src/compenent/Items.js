import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { apiResponse } from "../data/apiResponse";
import { Grid, Button } from "@mui/material";
import { useFormikContext } from "formik";

export default function Items({ values, handleSubmit }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsOthers, setSelectedItemsOthers] = useState([]);
  const formikProps = useFormikContext();

  const parentsWithCategory = apiResponse.filter(
    ({ category }) => category !== undefined
  );
  const parentsWithParentIdNull = apiResponse.filter(
    ({ parent_id }) => parent_id == null
  );

  const parents = [parentsWithCategory[0], parentsWithParentIdNull[0]];

  useEffect(() => {
    if (values.applied_to === "all") {
      setSelectedItems(parentsWithCategory);
      setSelectedItemsOthers(parentsWithParentIdNull);
    } else {
      setSelectedItems([]);
      setSelectedItemsOthers([]);
    }
  }, [values]);

  return (
    <div>
      <FormControlLabel
        label={parents[0]?.category?.name}
        control={
          <Checkbox
            checked={
              selectedItems.includes(
                apiResponse.filter(({ category }) => category !== undefined)[0]
              ) &&
              selectedItems.includes(
                apiResponse.filter(({ category }) => category !== undefined)[1]
              ) &&
              selectedItems.includes(
                apiResponse.filter(({ category }) => category !== undefined)[2]
              )
            }
            onChange={() => {
              if (
                !selectedItems.includes(
                  apiResponse.filter(
                    ({ category }) => category !== undefined
                  )[0]
                ) &&
                !selectedItems.includes(
                  apiResponse.filter(
                    ({ category }) => category !== undefined
                  )[1]
                ) &&
                !selectedItems.includes(
                  apiResponse.filter(
                    ({ category }) => category !== undefined
                  )[2]
                )
              ) {
                setSelectedItems(
                  apiResponse.filter(({ category }) => category !== undefined)
                );
              } else {
                setSelectedItems([]);
              }
            }}
          />
        }
      />
      {apiResponse.map((data) => {
        if (data.category !== undefined) {
          return (
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              <FormControlLabel
                label={data.name}
                control={
                  <Checkbox
                    checked={selectedItems.includes(data)}
                    onChange={() => {
                      if (selectedItems.includes(data)) {
                        setSelectedItems(
                          selectedItems.filter(({ id }) => id !== data.id)
                        );
                      } else {
                        setSelectedItems((pre) => [...pre, data]);
                      }
                    }}
                  />
                }
              />
            </Box>
          );
        }
      })}
      <br />
      <FormControlLabel
        label={parents[1]?.category?.name}
        control={
          <Checkbox
            checked={
              selectedItemsOthers.includes(
                apiResponse.filter(({ parent_id }) => parent_id == null)[0]
              ) &&
              selectedItemsOthers.includes(
                apiResponse.filter(({ parent_id }) => parent_id == null)[1]
              ) &&
              selectedItemsOthers.includes(
                apiResponse.filter(({ parent_id }) => parent_id == null)[2]
              ) &&
              selectedItemsOthers.includes(
                apiResponse.filter(({ parent_id }) => parent_id == null)[4]
              )
            }
            onChange={() => {
              if (
                !selectedItemsOthers.includes(
                  apiResponse.filter(({ parent_id }) => parent_id == null)[0]
                ) &&
                !selectedItemsOthers.includes(
                  apiResponse.filter(({ parent_id }) => parent_id == null)[1]
                ) &&
                !selectedItemsOthers.includes(
                  apiResponse.filter(({ parent_id }) => parent_id == null)[2]
                ) &&
                !selectedItemsOthers.includes(
                  apiResponse.filter(({ parent_id }) => parent_id == null)[3]
                ) &&
                !selectedItemsOthers.includes(
                  apiResponse.filter(({ parent_id }) => parent_id == null)[4]
                )
              ) {
                setSelectedItemsOthers(
                  apiResponse.filter(({ parent_id }) => parent_id == null)
                );
              } else {
                setSelectedItemsOthers([]);
              }
            }}
          />
        }
      />
      {apiResponse.map((data) => {
        if (data.parent_id == null) {
          return (
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              <FormControlLabel
                label={data.name}
                control={
                  <Checkbox
                    checked={selectedItemsOthers.includes(data)}
                    onChange={() => {
                      if (selectedItemsOthers.includes(data)) {
                        setSelectedItemsOthers(
                          selectedItemsOthers.filter(({ id }) => id !== data.id)
                        );
                      } else {
                        setSelectedItemsOthers((pre) => [...pre, data]);
                      }
                    }}
                  />
                }
              />
            </Box>
          );
        }
      })}
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2 }}
          onClick={(e) => {
            formikProps.setFieldValue(
              "applicable_items",
              selectedItems.concat(selectedItemsOthers).map((data) => data.id)
            );
            e.preventDefault();
            handleSubmit();
          }}
        >
          Apply tax to
          {selectedItems.length + selectedItemsOthers.length === 0
            ? ""
            : ` ${selectedItems.length + selectedItemsOthers.length} items(s)`}
        </Button>
      </Grid>
    </div>
  );
}
