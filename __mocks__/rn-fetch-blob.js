// mock for rn-fetch-blob
// basically following some hints here: https://github.com/wkh237/react-native-fetch-blob/issues/212
// code itself is handwritten to the things needed

module.exports = {
    DocumentDir: () => {},
    polyfill: () => {},
    config: (options) => {
        return {
            fetch: () => {
                return Promise.resolve({
                    path: () => 'something',
                })
            }
        }
    },
    session: (name) => {
        return {
            dispose: () => {
                return Promise.resolve();
            }
        }
    }
};
