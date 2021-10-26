export const fetchTriviaQuestions = async (url: string): Promise<{ props: { data: Record<string, null> | null } }> => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return { props: { data } };
    } catch (error) {
        // Handiling API errors
        return { props: { data: null } };
    }
};
