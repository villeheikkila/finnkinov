import React from 'react';
import { createUseStyles } from 'react-jss';
import Select from 'react-select';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingBottom: '20px',
    },
    header: {
        fontSize: 70,
        color: '#ECCB2F',
        fontWeight: 800,
        fontFamily: 'Work Sans',
    },
    selection: {
        width: '30%',
    },
});

const options = [
    { value: 1014, label: 'Pääkaupunkiseutu' },
    { value: 1012, label: 'Espoo' },
    { value: 1039, label: 'Espoo: OMENA' },
    { value: 1038, label: 'Espoo: SELLO' },
    { value: 1002, label: 'Helsinki' },
    { value: 1045, label: 'Helsinki: ITIS' },
    { value: 1031, label: 'Helsinki: KINOPALATSI' },
    { value: 1032, label: 'Helsinki: MAXIM' },
    { value: 1033, label: 'Helsinki: TENNISPALATSI' },
    { value: 1013, label: 'Vantaa: FLAMINGO' },
    { value: 1015, label: 'Jyväskylä: FANTASIA' },
    { value: 1016, label: 'Kuopio: SCALA' },
    { value: 1017, label: 'Lahti: KUVAPALATSI' },
    { value: 1041, label: 'Lappeenranta: STRAND' },
    { value: 1018, label: 'Oulu: PLAZA' },
    { value: 1019, label: 'Pori: PROMENADI' },
    { value: 1021, label: 'Tampere' },
    { value: 1034, label: 'Tampere: CINE ATLAS' },
    { value: 1035, label: 'Tampere: PLEVNA' },
    { value: 1022, label: 'Turku: KINOPALATSI' },
];

const customStyles = {
    singleValue: (base: any) => ({
        ...base,
        color: 'white',
        fontFamily: 'Roboto',
    }),
    control: (base: any, state: any) => ({
        ...base,
        color: '#ff0000',
        background: '#1C1C1E',
        borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
        borderColor: '#ECCB2F',
        boxShadow: null,
        '&:hover': {
            borderColor: '#ECCB2F',
        },
    }),
    menu: (base: any) => ({
        ...base,
        background: '#1C1C1E',
        color: 'white',
        fontFamily: 'Roboto',
        borderRadius: 0,
        marginTop: 0,
    }),
    menuList: (base: any) => ({
        ...base,
        color: 'white',
        padding: 0,
    }),
};

export const Header = ({ setCinema }: any): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <header className={classes.header}>Finnkinov</header>
            <Select
                options={options}
                className={classes.selection}
                defaultValue={{ value: 1014, label: 'Pääkaupunkiseutu' }}
                onChange={(value): void => setCinema(value)}
                styles={customStyles}
            />
        </div>
    );
};
