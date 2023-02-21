import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function SelectInput({ value, onChange, id = 'select', label = 'Select', items = [] }) {
    const selectItems = items.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>
                <Checkbox checked={value.indexOf(item.value) > -1} />
                <ListItemText primary={item.value} />
            </MenuItem>
        )
    })

    return (
        <FormControl sx={{
            width: '100%',
            mt: 1
        }}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                sx={{
                    width: '100%'
                }}
                multiple
                labelId={`${id}-label`}
                id={id}
                value={value}
                onChange={onChange}
                MenuProps={MenuProps}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
            >
                {selectItems}
            </Select>
        </FormControl>
    )
}