export default function Toast({ body }) {
    var ifInfoError = body.includes('Error');

    return (
        <div className={`${ifInfoError ? 'errorToast' : "infoToast"}`} >
            <div className="toast-header">
                <strong className="toast-title">{body}</strong>
            </div>
        </div>
    );
};