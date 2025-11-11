/**
 * 
 */
export class JsonReader {
    

    /**
     * Main progress calculation
     */
    public readJson(path : string) : Promise<any> {
        const loadAboutMeData = async () => {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.debug("new Json: ", data);
                return data;
            } catch (error) {
                console.error('Error loading about me data:', error);
                // fallback?
            }
        };

        return loadAboutMeData();
    }
}
