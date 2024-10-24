/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { Fragment } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';
import {
  EuiDescribedFormGroup,
  EuiFieldText,
  EuiFormRow,
  EuiSelect,
  EuiSwitch,
  EuiTitle,
} from '@elastic/eui';
import { AzureRepository, Repository } from '../../../../../common/types';
import { RepositorySettingsValidation } from '../../../services/validation';
import { ChunkSizeField, MaxSnapshotsField, MaxRestoreField } from './common';
import { DisableToolTip } from '../../disable_tooltip';

interface Props {
  repository: AzureRepository;
  isManagedRepository?: boolean;
  updateRepositorySettings: (
    updatedSettings: Partial<Repository['settings']>,
    replaceSettings?: boolean
  ) => void;
  settingErrors: RepositorySettingsValidation;
}

export const AzureSettings: React.FunctionComponent<Props> = ({
  repository,
  isManagedRepository,
  updateRepositorySettings,
  settingErrors,
}) => {
  const {
    settings: {
      client,
      container,
      basePath,
      compress,
      chunkSize,
      readonly,
      locationMode,
      maxRestoreBytesPerSec,
      maxSnapshotBytesPerSec,
    },
  } = repository;
  const hasErrors: boolean = Boolean(Object.keys(settingErrors).length);

  const locationModeOptions = ['primary_only', 'secondary_only'].map((option) => ({
    value: option,
    text: option,
  }));

  const updateSettings = (name: string, value: string) => {
    updateRepositorySettings({
      [name]: value,
    });
  };

  const managedRepositoryTooltipMessage = i18n.translate(
    'xpack.snapshotRestore.repositoryForm.disableToolTip',
    {
      defaultMessage: 'This field is disabled because you are editing a managed repository.',
    }
  );

  return (
    <Fragment>
      {/* Client field */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.clientTitle"
                defaultMessage="Client"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.snapshotRestore.repositoryForm.typeAzure.clientDescription"
            defaultMessage="The name of the Azure client."
          />
        }
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.snapshotRestore.repositoryForm.typeAzure.clientLabel"
              defaultMessage="Client"
            />
          }
          fullWidth
          isInvalid={Boolean(hasErrors && settingErrors.client)}
          error={settingErrors.client}
        >
          <DisableToolTip
            isManaged={isManagedRepository}
            tooltipMessage={managedRepositoryTooltipMessage}
            component={
              <EuiFieldText
                defaultValue={client || ''}
                fullWidth
                onChange={(e) => {
                  updateRepositorySettings({
                    client: e.target.value,
                  });
                }}
                data-test-subj="clientInput"
                disabled={isManagedRepository}
              />
            }
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>

      {/* Container field */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.containerTitle"
                defaultMessage="Container"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.snapshotRestore.repositoryForm.typeAzure.containerDescription"
            defaultMessage="The name of the Azure container to use for snapshots."
          />
        }
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.snapshotRestore.repositoryForm.typeAzure.containerLabel"
              defaultMessage="Container"
            />
          }
          fullWidth
          isInvalid={Boolean(hasErrors && settingErrors.container)}
          error={settingErrors.container}
        >
          <DisableToolTip
            isManaged={isManagedRepository}
            tooltipMessage={managedRepositoryTooltipMessage}
            component={
              <EuiFieldText
                defaultValue={container || ''}
                fullWidth
                onChange={(e) => {
                  updateRepositorySettings({
                    container: e.target.value,
                  });
                }}
                data-test-subj="containerInput"
                disabled={isManagedRepository}
              />
            }
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>

      {/* Base path field */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.basePathTitle"
                defaultMessage="Base path"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.snapshotRestore.repositoryForm.typeAzure.basePathDescription"
            defaultMessage="The container path to the repository data."
          />
        }
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.snapshotRestore.repositoryForm.typeAzure.basePathLabel"
              defaultMessage="Base path"
            />
          }
          fullWidth
          isInvalid={Boolean(hasErrors && settingErrors.basePath)}
          error={settingErrors.basePath}
        >
          <DisableToolTip
            isManaged={isManagedRepository}
            tooltipMessage={managedRepositoryTooltipMessage}
            component={
              <EuiFieldText
                defaultValue={basePath || ''}
                fullWidth
                onChange={(e) => {
                  updateRepositorySettings({
                    basePath: e.target.value,
                  });
                }}
                data-test-subj="basePathInput"
                disabled={isManagedRepository}
              />
            }
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>

      {/* Compress field */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.compressTitle"
                defaultMessage="Snapshot compression"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.snapshotRestore.repositoryForm.typeAzure.compressDescription"
            defaultMessage="Compresses the index mapping and setting files for snapshots. Data files are not compressed."
          />
        }
        fullWidth
      >
        <EuiFormRow
          fullWidth
          isInvalid={Boolean(hasErrors && settingErrors.compress)}
          error={settingErrors.compress}
        >
          <EuiSwitch
            label={
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.compressLabel"
                defaultMessage="Compress snapshots"
              />
            }
            checked={!(compress === false)}
            onChange={(e) => {
              updateRepositorySettings({
                compress: e.target.checked,
              });
            }}
            data-test-subj="compressToggle"
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>

      {/* Chunk size field */}
      <ChunkSizeField
        isInvalid={Boolean(hasErrors && settingErrors.chunkSize)}
        error={settingErrors.chunkSize}
        defaultValue={chunkSize || ''}
        updateSettings={updateSettings}
      />

      {/* Max snapshot bytes field */}
      <MaxSnapshotsField
        isInvalid={Boolean(hasErrors && settingErrors.maxSnapshotBytesPerSec)}
        error={settingErrors.maxSnapshotBytesPerSec}
        defaultValue={maxSnapshotBytesPerSec || ''}
        updateSettings={updateSettings}
      />

      {/* Max restore bytes field */}
      <MaxRestoreField
        isInvalid={Boolean(hasErrors && settingErrors.maxRestoreBytesPerSec)}
        error={settingErrors.maxRestoreBytesPerSec}
        defaultValue={maxRestoreBytesPerSec || ''}
        updateSettings={updateSettings}
      />

      {/* Location mode field */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.locationModeTitle"
                defaultMessage="Location mode"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.snapshotRestore.repositoryForm.typeAzure.locationModeDescription"
            defaultMessage="The primary or secondary location. If secondary, read-only is true."
          />
        }
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.snapshotRestore.repositoryForm.typeAzure.locationModeLabel"
              defaultMessage="Location mode"
            />
          }
          fullWidth
          isInvalid={Boolean(hasErrors && settingErrors.locationMode)}
          error={settingErrors.locationMode}
        >
          <EuiSelect
            options={locationModeOptions}
            value={locationMode || locationModeOptions[0].value}
            onChange={(e) => {
              updateRepositorySettings({
                locationMode: e.target.value,
                readonly: e.target.value === locationModeOptions[1].value ? true : readonly,
              });
            }}
            fullWidth
            data-test-subj="locationModeSelect"
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>

      {/* Readonly field */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.readonlyTitle"
                defaultMessage="Read-only"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.snapshotRestore.repositoryForm.typeAzure.readonlyDescription"
            defaultMessage="Only one cluster should have write access to this repository. All other clusters should be read-only."
          />
        }
        fullWidth
      >
        <EuiFormRow
          fullWidth
          isInvalid={Boolean(hasErrors && settingErrors.readonly)}
          error={settingErrors.readonly}
        >
          <EuiSwitch
            disabled={locationMode === locationModeOptions[1].value}
            label={
              <FormattedMessage
                id="xpack.snapshotRestore.repositoryForm.typeAzure.readonlyLabel"
                defaultMessage="Read-only repository"
              />
            }
            checked={!!readonly}
            onChange={(e) => {
              updateRepositorySettings({
                readonly: locationMode === locationModeOptions[1].value ? true : e.target.checked,
              });
            }}
            data-test-subj="readOnlyToggle"
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </Fragment>
  );
};
