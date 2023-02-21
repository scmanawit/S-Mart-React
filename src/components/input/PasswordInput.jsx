import {InputAdornment, OutlinedInput, FormControl, InputLabel, IconButton} from "@mui/material"
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function PasswordInput({value, onChange, id = 'password', label = 'Password'}) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event => {
        event.preventDefault()
    })

    return (
        <FormControl sx={{width: '100%', mb: 1, mt: 1}} variant="outlined">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                value={value}
                onChange={onChange}
            />
        </FormControl>
    )
}