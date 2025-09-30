# Worksample Actions

This folder contains server actions specific to the worksample functionality.

## Functions

### `getAllWorksampleFolders(baseFolder?: string)`
- **Purpose**: Get all available folders from Cloudinary for worksample
- **Parameters**: 
  - `baseFolder` (optional): Base folder path, defaults to 'website/workSample'
- **Returns**: Array of folder names
- **Usage**: Used in worksample pages to populate folder filters

### `getWorksampleImagesByPrefix(prefixPath: string, max?: number)`
- **Purpose**: Fetch images by prefix including subfolders
- **Parameters**:
  - `prefixPath`: The folder prefix to search
  - `max` (optional): Maximum number of images, defaults to 100
- **Returns**: Array of OptimizedImage objects
- **Usage**: Used for bulk image loading

### `getWorksampleImagesPaginated(prefixPath: string, cursor?: string, max?: number)`
- **Purpose**: Get paginated images by prefix for infinite scroll
- **Parameters**:
  - `prefixPath`: The folder prefix to search
  - `cursor` (optional): Pagination cursor
  - `max` (optional): Maximum number of images per page, defaults to 24
- **Returns**: PaginatedResult with items and nextCursor
- **Usage**: Used in GalleryClient for infinite scroll functionality

### `getWorksampleImagesFromFolder(folderPath: string, limit?: number)`
- **Purpose**: Get images from a specific worksample folder
- **Parameters**:
  - `folderPath`: The specific folder path
  - `limit` (optional): Maximum number of images, defaults to 24
- **Returns**: Array of OptimizedImage objects
- **Usage**: Used in individual folder pages

## Migration Notes

These functions were moved from `lib/cloudinary.ts` to follow the folder structure rules:
- Worksample-specific functions should be in the worksample folder
- Server actions should be in the actions folder
- This improves code organization and maintainability

## Error Handling

All functions include proper error handling:
- Cloudinary configuration validation
- Fallback mechanisms for API failures
- Comprehensive logging for debugging
- Graceful degradation (return empty arrays on error)
