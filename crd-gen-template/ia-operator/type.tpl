{{ define "type" }}

<h3 id="{{ anchorIDForType . }}" class="anchor anchorWithStickyNavbar">{{- .Name.Name }}{{ if eq .Kind "Alias" }}(<code>{{.Underlying}}</code> alias){{ end -}}<a href="#{{anchorIDForType .}}" class="hash-link" aria-label="Direct link to {{.Name.Name}}" title="Direct link to {{.Name.Name}}"></a></h3>
{{ with (typeReferences .) }}
    <p>
        (<em>Appears on:</em>
        {{- $prev := "" -}}
        {{- range . -}}
            {{- if $prev -}}, {{ end -}}
            {{ $prev = . }}
            <a href="{{ linkForType . }}">{{ typeDisplayName . }}</a>
        {{- end -}}
        )
    </p>
{{ end }}


    {{ safe (renderComments .CommentLines) }}

{{ if .Members }}
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {{ if isExportedType . }}
        <tr>
            <td>
                <code>apiVersion</code><br/>
                string</td>
            <td>
                <code>
                    {{apiGroup .}}
                </code>
            </td>
        </tr>
        <tr>
            <td>
                <code>kind</code><br/>
                string
            </td>
            <td><code>{{.Name.Name}}</code></td>
        </tr>
        {{ end }}
        {{ template "members" .}}
    </tbody>
</table>
{{ end }}

{{ end }}
