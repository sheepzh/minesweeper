declare namespace chrome {
    namespace runtime {
        type ManifestFirefox = Omit<ManifestV2, "author"> & {
            // "author" must be string for Firefox
            author?: string
            browser_specific_settings?: {
                gecko?: {
                    id?: string
                }
            }
        }
    }
}