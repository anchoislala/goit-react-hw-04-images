import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from "react-icons/bs";
import PropTypes from 'prop-types';
import './Searchbar.styled.css';

export default function Searchbar ({onSubmit}) {

    const [imageName, setImageName] = useState('');

    const handleInputChange = event => {
        const searchImage = event.currentTarget.value;

        setImageName(searchImage);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (imageName.trim() === '') {
            toast.error('Enter the name of image');
            return;
        };

        onSubmit(imageName);
        setImageName('');
    };    

        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <BsSearch />
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="imageName"
                        value={imageName}
                        onChange={handleInputChange}
                    />
                </form>
            </header>
        );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};