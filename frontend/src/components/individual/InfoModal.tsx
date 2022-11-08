import close from '@images/close.svg';
import '@individual/SettingsModal.scss';
interface props {
  open: boolean;
  type: string;
  onConfirmed: () => void;
}

function InfoModal({open, type, onConfirmed}: props) {
  const isLicense = type === 'license';
  const content = () => {
    if (isLicense) {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam, ligula eget rutrum aliquet, leo neque accumsan sapien, sit amet maximus velit odio sit amet diam. Ut in dolor id justo luctus mattis sit amet et leo. Aenean nec tincidunt nulla. In rutrum luctus turpis, at hendrerit velit consectetur vel. Mauris lobortis porttitor dictum. Nullam facilisis felis in ipsum condimentum iaculis. Quisque pulvinar sem et ante elementum dapibus. Quisque tempus augue non arcu imperdiet tempus. Vivamus ullamcorper ipsum ac massa vehicula, ac consequat leo laoreet. Etiam vitae lobortis libero, maximus convallis risus. Integer ipsum orci, pulvinar sit amet mollis eget, malesuada a enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. \n Integer bibendum diam magna, ut rutrum velit vulputate vitae. Cras eget sollicitudin velit, ac dapibus nunc. Aenean sed diam euismod, feugiat justo ut, placerat neque. Pellentesque id purus sed ex auctor tempus. Maecenas vestibulum ante risus, nec molestie ex convallis nec. Aliquam aliquam lacus metus, non tincidunt mi vehicula id. In hac habitasse platea dictumst. Cras sed est consequat, mattis nunc eu, pharetra purus. Nulla ut pulvinar neque. Curabitur iaculis eleifend dapibus. Sed suscipit sem ac tempus porta. Praesent ac venenatis dui. Donec aliquet mauris enim, sit amet sodales magna cursus quis. Aliquam posuere velit nec arcu ultricies, quis consectetur orci commodo.';
    } else {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam, ligula eget rutrum aliquet, leo neque accumsan sapien, sit amet maximus velit odio sit amet diam. Ut in dolor id justo luctus mattis sit amet et leo. Aenean nec tincidunt nulla. In rutrum luctus turpis, at hendrerit velit consectetur vel. Mauris lobortis porttitor dictum. Nullam facilisis felis in ipsum condimentum iaculis. Quisque pulvinar sem et ante elementum dapibus. Quisque tempus augue non arcu imperdiet tempus. Vivamus ullamcorper ipsum ac massa vehicula, ac consequat leo laoreet. Etiam vitae lobortis libero, maximus convallis risus. Integer ipsum orci, pulvinar sit amet mollis eget, malesuada a enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer bibendum diam magna, ut rutrum velit vulputate vitae. Cras eget sollicitudin velit, ac dapibus nunc. Aenean sed diam euismod, feugiat justo ut, placerat neque. Pellentesque id purus sed ex auctor tempus. Maecenas vestibulum ante risus, nec molestie ex convallis nec. Aliquam aliquam lacus metus, non tincidunt mi vehicula id. In hac habitasse platea dictumst. Cras sed est consequat, mattis nunc eu, pharetra purus. Nulla ut pulvinar neque. Curabitur iaculis eleifend dapibus. Sed suscipit sem ac tempus porta. Praesent ac venenatis dui. Donec aliquet mauris enim, sit amet sodales magna cursus quis. Aliquam posuere velit nec arcu ultricies, quis consectetur orci commodo.';
    }
  };
  return (
    <>
      {open ? (
        <main id="infoModal" className="settingsModal">
          <section className="modal-x">
            <img
              src={close}
              onClick={onConfirmed}
              className="modal-cancel button"
            />
            <div className="info-title">
              {isLicense ? '라이선스' : '도움말'}
            </div>
            <div className="info-content-parent">
              <p className="info-content">{content()}</p>
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
}

export default InfoModal;
