import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export function Modal({ isOpen, onClose, children }) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Уведомление"}</DialogTitle>
            <DialogContent>
                {/*<DialogContentText id="alert-dialog-description">*/}
                    {children}
                {/*</DialogContentText>*/}
            </DialogContent>
            {/*<DialogActions>*/}
            {/*    <Button onClick={onClose} variant="outlined">*/}
            {/*        Закрыть*/}
            {/*    </Button>*/}
            {/*</DialogActions>*/}
        </Dialog>
    );
}
