import { act, fireEvent, render, waitFor } from '@testing-library/react';
import Dropzone from 'react-dropzone';

test('invoke onDragEnter when dragenter event occurs', async () => {
	const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
		type: 'application/json',
	});
	const data = mockData([file]);
	const onDragEnter = jest.fn();

	const ui = (
		<Dropzone onDragEnter={onDragEnter}>
			{({ getRootProps, getInputProps }) => (
				<div {...getRootProps()}>
					<input {...getInputProps()} />
				</div>
			)}
		</Dropzone>
	);
	const { container, rerender } = render(ui);
	const dropzone = container.querySelector('div');

	dispatchEvt(dropzone, 'dragenter', data);
	await flushPromises(rerender, ui);

	expect(onDragEnter).toHaveBeenCalled();
});

async function flushPromises(rerender, ui) {
	await act(() => waitFor(() => rerender(ui)));
}

function dispatchEvt(node, type, data) {
	const event = new Event(type, { bubbles: true });
	Object.assign(event, data);
	fireEvent(node, event);
}

function mockData(files) {
	return {
		dataTransfer: {
			files,
			items: files.map((file) => ({
				kind: 'file',
				type: file.type,
				getAsFile: () => file,
			})),
			types: ['Files'],
		},
	};
}
