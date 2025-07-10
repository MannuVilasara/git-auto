import fs from 'fs';

const getConfig = (filePath: string): Record<string, any> => {
    if (!fs.existsSync(filePath)) {
        console.log(`Configuration file not found at ${filePath}`);
        return {};
    }
    const configContent = fs.readFileSync(filePath, 'utf-8');
    try {
        return JSON.parse(configContent);
    } catch (error) {
        throw new Error(`Error parsing configuration file: ${error.message}`);
    }
}

export default getConfig;