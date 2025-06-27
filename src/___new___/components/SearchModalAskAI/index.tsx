import { Box } from '@chakra-ui/react';
import React from 'react';
import AskAIButton from '../AskAIButton';

type SearchModalAskAIProps = {
    onClose: () => void;
}

const SearchModalAskAI = ({ onClose }: SearchModalAskAIProps) => {
    const [query, setQuery] = React.useState<string | null>(null)
    const inputSearchRef = React.useRef<HTMLInputElement>(null);
    const inputClearButtonRef = React.useRef<HTMLButtonElement>(null)

    const handleClearSearch = React.useCallback(() => {
        setQuery(null);
    }, [])

    const handleSearchInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);

        if (!inputClearButtonRef.current) {
            inputClearButtonRef.current = document.querySelector('.DocSearch-Reset');
            inputClearButtonRef.current?.addEventListener('click', handleClearSearch)
        }
    }, []);

    React.useEffect(() => {
        return () => {
            inputSearchRef.current?.removeEventListener('input', handleSearchInput as any)
            inputClearButtonRef.current?.removeEventListener('click', handleClearSearch)
        }
    }, [])

    if (!inputSearchRef.current) {
        inputSearchRef.current = document.querySelector('#docsearch-input');
        inputSearchRef.current?.addEventListener('input', handleSearchInput as any)
    }

    return <Box mt={query ? 4 : 0} mb={query ? 1 : 0} width='100%'>
        <AskAIButton query={query} onClick={onClose} />
    </Box>
}

export default SearchModalAskAI;