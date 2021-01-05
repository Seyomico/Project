package project.pitchinganalyzer;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.List;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/project/pitchinganalyzer/choice")
public class ChoiceServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		ServletContext context = this.getServletContext();
		Pitcher pitcher = (Pitcher) context.getAttribute("Pitcher");
		if (pitcher == null) {
			pitcher = new Pitcher();
			context.setAttribute("Pitcher", pitcher);
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		Pitcher pitcher = new Pitcher();

		List<String> names = pitcher.getPitcherName();

		StringBuilder builder = new StringBuilder();
		// builder.append("[");

		// for(int i = 0; i < names.size() - 1; i++)
		// builder.append("\"").append(names.get(i)).append("\",");
		//
		// builder.append("\"").append(names.get(names.size() - 1)).append("\"");


		builder.append('{');
		builder.append("\"message\":");
		builder.append("[");

		for(int i = 0; i < names.size() - 1; i++)
		builder.append("\"").append(names.get(i)).append("\",");

		builder.append("\"").append(names.get(names.size() - 1)).append("\"]");
		builder.append("}");

		String json = builder.toString();

		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();

}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		Pitcher pitcher = new Pitcher();

		String pitcherName = request.getParameter("pitcherName");
		String dexterity = pitcher.getPitcherDexterity(pitcherName);

		StringBuilder builder = new StringBuilder();
		builder.append(dexterity);
		String json = builder.toString();
		System.out.println(json);

	response.setContentType("application/json");
	PrintWriter writer = response.getWriter();
	writer.append(json);
	writer.flush();
}

}
