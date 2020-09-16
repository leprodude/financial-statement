import React, { useContext } from "react";
import { FormContext } from "./contexts/FormContext";
import NewInOutForm from "./NewInOutForm";
import {
    Heading,
    Container,
    Tag,
    Modal,
    Section,
    //@ts-ignore
} from "react-bulma-components";

interface FormModalProps {

}

export const FormModal: React.FC<FormModalProps> = () => {

    const { showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing } = useContext(
        FormContext
    );

    return (
        <Modal
            show={showModal}
            onClose={() => {
                setEntry!(undefined);
                setIsEditing!(false);
                toggleShowModal!();
            }}
            closeOnBlur={true}
            showClose={false}
        >
            <Modal.Content>
                {entry !== undefined &&
                    (<Section style={{ backgroundColor: "white" }}>
                        <Container>
                            <Heading size={5} renderAs="p" style={{ padding: "0 2.5%" }}>
                                {isEditing ? `Edit ${entry!._type}` : `New ${entry!._type}`}
                                <Tag
                                    role="button"
                                    name="close"
                                    aria-label="close form"
                                    remove
                                    className="InOutBox-close-modal is-pulled-right"
                                    onClick={() => {
                                        setEntry!(undefined);
                                        setIsEditing!(false);
                                        toggleShowModal!();
                                    }}
                                ></Tag>
                            </Heading>

                            <NewInOutForm reset={() => {
                                setEntry!(undefined);
                                setIsEditing!(false);
                            }} />
                        </Container>
                    </Section>)}
            </Modal.Content>
        </Modal>
    );
}