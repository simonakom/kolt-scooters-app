import * as PropTypes from "prop-types";
export default function ErrorMessage({ children, onClose }) {
	return (
        <div
            className="bg-[#f15d6996] text-[#ffe7e7] px-4 py-2 rounded-2xl"
            // style={{visibility: children === "" ? "hidden" : "visible"}}
            onClick={onClose}>{children}
        </div>
    );
}
ErrorMessage.propTypes = {
children: PropTypes.string,
onClose: PropTypes.func,
};