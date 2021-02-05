export const renderFileInput = (props) => {
    return (<input
        type="file"
        value={props.value}
        onChange={props.handleUpload}
    />)
}