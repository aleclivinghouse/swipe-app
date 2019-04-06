import React, { Component } from 'react';
import {
Text,
Icon,
Input,
List,
ListItem,
InputGroup,
TextInput,
CheckBox,
Picker
} from 'native-base';

const renderText = ({ input, label, type, meta: { touched, error, warning } }) => (
    <ListItem>
        <InputGroup iconRight>
            <Icon name="ios-person" />
            <Input {...input} placeholder={label} type={type}/>
            {touched && ((error && <Text>{error}</Text>) || (warning && <Text>{warning}</Text>))}
        </InputGroup>
    </ListItem>
);


const renderNumber = ({ input, placeholder, meta: { asyncValidating, touched, error } }) => (
    <ListItem>
        <InputGroup iconRight>
            <Icon name="ios-phone-portrait" />
            <Input placeholder={placeholder} {...input} />
        </InputGroup>
    </ListItem>
);

const renderPassword = ({ input, placeholder, meta: {touched, error }, ...custom }) => (
    <ListItem>
        <InputGroup iconRight>
            <Icon name="ios-code-working" />
            <Input placeholder="Password" {...input} {...custom} />
        </InputGroup>
    </ListItem>
);

const renderCheckbox = ({ input, label, custom }) => (

    <ListItem>
        <CheckBox {...input} checked={input.value ? true : false} onPress={() => input.onChange(!input.value)} />
        <Text> {label} </Text>
    </ListItem>

);

const renderSelect = ({ input, label, children, ...custom }) => (

    <Picker {...input} selectedValue={input.value} onValueChange={(value, index) => input.onChange(value)} children={children} {...custom} />
);


export { renderText, renderNumber, renderPassword, renderCheckbox, renderSelect, };
